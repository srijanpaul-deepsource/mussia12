import { PubSub } from '@google-cloud/pubsub';
import type { Request, Response } from 'express';
const pubsub = new PubSub();

import type { events } from '@mussia12/shared/data-types';

function publishPubSubMessage(topic: events, message: any) {
  const buffer = Buffer.from(JSON.stringify(message));
  return pubsub.topic(topic).publish(buffer);
}

const publishTopic = (req: Request, res: Response) => {
  const { topic } = req.body;
  delete req.body.topic;
  publishPubSubMessage(topic, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log('Failed send PubSub topic!', err); // eslint-disable-line
    });
};

export { publishTopic };

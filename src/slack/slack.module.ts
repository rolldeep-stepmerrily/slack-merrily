import { Module } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Module({
  providers: [
    {
      provide: WebClient,
      useFactory: () => {
        return new WebClient(process.env.SLACK_BOT_TOKEN);
      },
    },
  ],
  exports: [WebClient],
})
export class SlackModule {}

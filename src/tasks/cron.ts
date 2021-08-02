import env from '../env'
import feed from './feed'
import { CronJob } from 'cron';

export class Cron {

  cronJob: CronJob

  constructor() {
    this.cronJob = new CronJob(
      env.CRON,
      async () => {
        try {
          await feed()
        } catch (e) {
          console.error(e);
        }
      },
      null,
      false,
      env.TZ
    )
  }

  isRunning() {
    return this.cronJob.running
  }

  start() {
    if (!this.isRunning()) {
      this.cronJob.start();
    }
  }

  stop() {
    if (this.isRunning()) {
      this.cronJob.stop();
    }
  }
}
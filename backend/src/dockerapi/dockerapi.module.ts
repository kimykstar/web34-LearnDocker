import { Module } from '@nestjs/common';
import { DockerapiService } from './dockerapi.service';
import { DockerapiController } from './dockerapi.controller';

@Module({
  providers: [DockerapiService],
  controllers: [DockerapiController]
})
export class DockerapiModule {}

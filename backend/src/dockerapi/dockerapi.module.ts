import { Module } from '@nestjs/common';
import { DockerapiService } from './dockerapi.service';
import { DockerapiController } from './dockerapi.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [DockerapiService],
    controllers: [DockerapiController],
})
export class DockerapiModule {}

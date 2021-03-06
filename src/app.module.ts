import { config as dotenvConfig } from 'dotenv';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard } from './users/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MembersModule } from './members/members.module';
import { ProjectsModule } from './projects/projects.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketMessagesModule } from './ticket-messages/ticket-messages.module';

//TODO use config module
dotenvConfig();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:27017/${process.env.DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        authSource: 'admin',
      },
    ),
    AuthModule,
    UsersModule,
    MembersModule,
    ProjectsModule,
    TicketsModule,
    TicketMessagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

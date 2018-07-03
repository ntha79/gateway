import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayChatMessagesModule } from './chat-messages/chat-messages.module';
import { GatewayChatgroupsModule } from './chatgroups/chatgroups.module';
import { GatewayChatgroupstatisticsModule } from './chatgroupstatistics/chatgroupstatistics.module';
import { GatewayChatMessageStatisticsModule } from './chat-message-statistics/chat-message-statistics.module';
import { GatewayContactsModule } from './contacts/contacts.module';
import { GatewayUserSettingsModule } from './user-settings/user-settings.module';
import { GatewayPushNotificationsModule } from './push-notifications/push-notifications.module';
import { GatewayServiceSettingsModule } from './service-settings/service-settings.module';
import { GatewayChatmessagestatisticsModule } from './chatmessagestatistics/chatmessagestatistics.module';
import { GatewayChatGroupStatisticsModule } from './chat-group-statistics/chat-group-statistics.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayChatMessagesModule,
        GatewayChatgroupsModule,
        GatewayChatgroupstatisticsModule,
        GatewayChatMessageStatisticsModule,
        GatewayContactsModule,
        GatewayUserSettingsModule,
        GatewayPushNotificationsModule,
        GatewayServiceSettingsModule,
        GatewayChatmessagestatisticsModule,
        GatewayChatGroupStatisticsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}

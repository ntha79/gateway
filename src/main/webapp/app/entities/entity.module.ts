import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayChatMessagesModule } from './chat-messages/chat-messages.module';
import { GatewayFriendsModule } from './friends/friends.module';
import { GatewayGroupMembersModule } from './group-members/group-members.module';
import { GatewayGroupMemberStatisticsModule } from './group-member-statistics/group-member-statistics.module';
import { GatewayChatMessageStatisticsModule } from './chat-message-statistics/chat-message-statistics.module';
import { GatewayContactsModule } from './contacts/contacts.module';
import { GatewayFanpagesModule } from './fanpages/fanpages.module';
import { GatewayFanpageStatisticsModule } from './fanpage-statistics/fanpage-statistics.module';
import { GatewayUserSettingsModule } from './user-settings/user-settings.module';
import { GatewayPushNotificationsModule } from './push-notifications/push-notifications.module';
import { GatewayServiceSettingsModule } from './service-settings/service-settings.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayChatMessagesModule,
        GatewayFriendsModule,
        GatewayGroupMembersModule,
        GatewayGroupMemberStatisticsModule,
        GatewayChatMessageStatisticsModule,
        GatewayContactsModule,
        GatewayFanpagesModule,
        GatewayFanpageStatisticsModule,
        GatewayUserSettingsModule,
        GatewayPushNotificationsModule,
        GatewayServiceSettingsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}

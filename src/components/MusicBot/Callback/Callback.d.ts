import React from 'react';
import { User, Guild } from '../../../types/User';
declare const Callback: React.FC<{
    onAuth: (user: User, guilds: Guild[]) => void;
}>;
export default Callback;

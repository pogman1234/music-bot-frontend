import React from 'react';
import { User, Guild } from '../../../types/User';
interface MusicBotHeaderProps {
    user: User | null;
    guilds: Guild[];
    selectedGuild: string;
    onGuildChange: (guildId: string) => void;
}
declare const Header: React.FC<MusicBotHeaderProps>;
export default Header;

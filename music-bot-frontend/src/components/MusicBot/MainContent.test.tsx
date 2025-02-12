import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import MainContent from './MainContent';

describe('MainContent', () => {
    const guildId = '12345';
    const guildName = 'Test Guild';

    it('renders correctly', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        expect(getByText("Poggy's Music Bot")).toBeInTheDocument();
    });

    it('has the correct class name', () => {
        const { container } = render(<MainContent guildId={guildId} guildName={guildName} />);
        expect(container.firstChild).toHaveClass('MuiContainer-root');
    });

    it('renders NowPlaying component', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        expect(getByText('Now Playing')).toBeInTheDocument();
    });

    it('renders Queue component', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        expect(getByText('Queue for ${guildName}')).toBeInTheDocument();
    });

    it('displays the correct guild name', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        expect(getByText(guildName)).toBeInTheDocument();
    });

    it('renders with the correct typography variant', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        const typographyElement = getByText("Poggy's Music Bot");
        expect(typographyElement).toHaveClass('MuiTypography-h3');
    });

    it('renders with the correct box styling', () => {
        const { container } = render(<MainContent guildId={guildId} guildName={guildName} />);
        const boxElement = container.querySelector('.MuiBox-root');
        expect(boxElement).toHaveStyle('display: flex');
        expect(boxElement).toHaveStyle('flexDirection: column');
        expect(boxElement).toHaveStyle('gap: 2');
        expect(boxElement).toHaveStyle('width: 100%');
    });

    it('renders with the correct typography alignment', () => {
        const { getByText } = render(<MainContent guildId={guildId} guildName={guildName} />);
        const typographyElement = getByText("Poggy's Music Bot");
        expect(typographyElement).toHaveStyle('textAlign: center');
    });
});
/**
 * Link Generator Service
 * Handles deep link generation and validation for affiliate programs
 */

import { PARTNER_LINKS, VALIDATION_CRITERIA, ISLAND_NAMES } from '../data/affiliates.js';

class LinkGeneratorService {
    /**
     * Generate a Tradedoubler deep link
     */
    generateDeepLink(inputUrl, islandCode, partnerName) {
        let parsedUrl;
        try {
            parsedUrl = new URL(inputUrl);
        } catch (e) {
            return { success: false, error: 'invalidUrl' };
        }

        const baseLink = this.getPartnerBaseLink(islandCode, partnerName);
        if (!baseLink) {
            return { success: false, error: 'Programma o partner non trovato' };
        }

        if (!this.validateUrl(parsedUrl.href, islandCode, partnerName)) {
            return {
                success: false,
                error: `URL non valido per ${partnerName}`
            };
        }

        const encodedUrl = encodeURIComponent(parsedUrl.href);
        const deepLink = `${baseLink}&url=${encodedUrl}`;

        return { success: true, link: deepLink };
    }

    /**
     * Get the base tracking link for a partner
     */
    getPartnerBaseLink(islandCode, partnerName) {
        return PARTNER_LINKS[islandCode]?.[partnerName] || null;
    }

    /**
     * Validate URL against allowed domains
     */
    validateUrl(url, islandCode, partnerName) {
        const criteria = VALIDATION_CRITERIA[islandCode]?.[partnerName];
        if (!criteria) return true;
        return criteria.some(allowedUrl => url.includes(allowedUrl));
    }

    /**
     * Get all partners for an island
     */
    getPartnersForIsland(islandCode) {
        const links = PARTNER_LINKS[islandCode];
        if (!links) return [];
        return Object.keys(links).map(name => ({ name, link: links[name] }));
    }

    /**
     * Get island name by code
     */
    getIslandName(code) {
        return ISLAND_NAMES[code] || 'Isola Sconosciuta';
    }

    /**
     * Get all islands
     */
    getAllIslands() {
        return Object.entries(ISLAND_NAMES).map(([code, name]) => ({
            code,
            name,
            displayName: `${name} - ${code}`
        }));
    }

    /**
     * Copy to clipboard
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            try {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (e) {
                return false;
            }
        }
    }

    /**
     * Open link in new tab
     */
    openLink(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    /**
     * Generate GetYourGuide deep link
     * Accepts all regional domains: .com, .it, .es, .de, .fr, etc.
     */
    generateGetYourGuideLink(inputUrl) {
        try {
            const url = new URL(inputUrl);
            // Match getyourguide with any TLD (.com, .it, .es, .de, .fr, etc.)
            if (!url.hostname.match(/getyourguide\.[a-z]{2,}/i)) {
                return { success: false, error: 'validGetYourGuideURL' };
            }
            const affiliateId = '32A3BBP4J4PPZMHRC1G0';
            const deepLink = `https://www.getyourguide.com/click/track?partner_id=${affiliateId}&url=${encodeURIComponent(inputUrl)}`;
            return { success: true, link: deepLink };
        } catch (e) {
            return { success: false, error: 'invalidUrl' };
        }
    }

    /**
     * Generate Civitatis deep link
     * Accepts all regional domains: .com, .es, .it, etc.
     */
    generateCivitatisLink(inputUrl) {
        try {
            const url = new URL(inputUrl);
            // Match civitatis with any TLD
            if (!url.hostname.match(/civitatis\.[a-z]{2,}/i)) {
                return { success: false, error: 'validCivitatisURL' };
            }
            const affiliateId = '52698';
            const deepLink = `https://www.civitatis.com/affiliate/?aid=${affiliateId}&url=${encodeURIComponent(inputUrl)}`;
            return { success: true, link: deepLink };
        } catch (e) {
            return { success: false, error: 'invalidUrl' };
        }
    }
}

export const linkGenerator = new LinkGeneratorService();
export default linkGenerator;

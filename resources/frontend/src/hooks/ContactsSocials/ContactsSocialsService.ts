import apiConfig from '../../utilities/apiConfig';

export interface Contact {
    id: string;
    name: string;
    data: string;
    created_at: string;
    updated_at: string;
}

export interface Social {
    id: string;
    name: string;
    link: string;
    created_at: string;
    updated_at: string;
}

export interface ContactFormData {
    name: string;
    data: string;
}

export interface SocialFormData {
    name: string;
    link: string;
}

export interface ContactUpdateData {
    data: string;
}

export interface SocialUpdateData {
    link: string;
}

interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export class ContactsSocialsService {
    static async fetchContacts(): Promise<Contact[]> {
        try {
            const response = await fetch(apiConfig.endpoints.contacts.list);

            if (!response.ok) {
                throw new Error(`Failed to fetch contacts: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
            throw error;
        }
    }

    static async updateContact(id: string, updateData: ContactUpdateData): Promise<Contact> {
        try {
            const response = await fetch(apiConfig.endpoints.contacts.update(id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update contact: ${response.status} ${response.statusText}`);
            }

            const updatedContact = await response.json();
            return updatedContact;
        } catch (error) {
            console.error('Failed to update contact:', error);
            throw error;
        }
    }

    static async fetchSocials(): Promise<Social[]> {
        try {
            const response = await fetch(apiConfig.endpoints.socials.list);

            if (!response.ok) {
                throw new Error(`Failed to fetch socials: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch socials:', error);
            throw error;
        }
    }

    static async updateSocial(id: string, updateData: SocialUpdateData): Promise<Social> {
        try {
            const response = await fetch(apiConfig.endpoints.socials.update(id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update social: ${response.status} ${response.statusText}`);
            }

            const updatedSocial = await response.json();
            return updatedSocial;
        } catch (error) {
            console.error('Failed to update social:', error);
            throw error;
        }
    }
}

export const { fetchContacts, updateContact, fetchSocials, updateSocial } = ContactsSocialsService;

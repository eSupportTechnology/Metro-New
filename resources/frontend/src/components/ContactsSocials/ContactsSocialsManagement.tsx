import React, { useState, useEffect } from 'react';
import { Loader, RefreshCw, Edit, Eye, Search, X, Phone, Globe } from 'lucide-react';
import { ContactsSocialsService, Contact, Social, ContactFormData, SocialFormData } from '../../hooks/ContactsSocials/ContactsSocialsService';

const ContactsSocialsManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'contacts' | 'socials'>('contacts');
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [contactFormData, setContactFormData] = useState<ContactFormData>({
        name: '',
        data: '',
    });
    const [socials, setSocials] = useState<Social[]>([]);
    const [selectedSocial, setSelectedSocial] = useState<Social | null>(null);
    const [socialFormData, setSocialFormData] = useState<SocialFormData>({
        name: '',
        link: '',
    });
    const [showViewModal, setShowViewModal] = useState<boolean>(false);
    const [showFormModal, setShowFormModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

    const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact.data.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredSocials = socials.filter((social) => social.name.toLowerCase().includes(searchTerm.toLowerCase()) || social.link.toLowerCase().includes(searchTerm.toLowerCase()));

    const fetchContacts = async () => {
        setIsLoading(true);
        try {
            const data = await ContactsSocialsService.fetchContacts();
            setContacts(data);
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
            setContacts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSocials = async () => {
        setIsLoading(true);
        try {
            const data = await ContactsSocialsService.fetchSocials();
            setSocials(data);
        } catch (error) {
            console.error('Failed to fetch socials:', error);
            setSocials([]);
        } finally {
            setIsLoading(false);
        }
    };

    const updateContact = async (id: string, data: string) => {
        setIsActionLoading(true);
        try {
            const updatedContact = await ContactsSocialsService.updateContact(id, { data });
            setContacts((prev) => prev.map((contact) => (contact.id === id ? updatedContact : contact)));
            return updatedContact;
        } catch (error) {
            console.error('Failed to update contact:', error);
            throw error;
        } finally {
            setIsActionLoading(false);
        }
    };

    const updateSocial = async (id: string, link: string) => {
        setIsActionLoading(true);
        try {
            const updatedSocial = await ContactsSocialsService.updateSocial(id, { link });
            setSocials((prev) => prev.map((social) => (social.id === id ? updatedSocial : social)));
            return updatedSocial;
        } catch (error) {
            console.error('Failed to update social:', error);
            throw error;
        } finally {
            setIsActionLoading(false);
        }
    };

    const resetContactForm = () => {
        setContactFormData({ name: '', data: '' });
        setSelectedContact(null);
        setIsEditMode(false);
    };

    const resetSocialForm = () => {
        setSocialFormData({ name: '', link: '' });
        setSelectedSocial(null);
        setIsEditMode(false);
    };

    const handleContactEdit = (contact: Contact) => {
        setSelectedContact(contact);
        setContactFormData({
            name: contact.name,
            data: contact.data,
        });
        setIsEditMode(true);
        setShowFormModal(true);
    };

    const handleSocialEdit = (social: Social) => {
        setSelectedSocial(social);
        setSocialFormData({
            name: social.name,
            link: social.link,
        });
        setIsEditMode(true);
        setShowFormModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (activeTab === 'contacts') {
                if (isEditMode && selectedContact) {
                    await updateContact(selectedContact.id, contactFormData.data);
                } else {
                }
                resetContactForm();
            } else {
                if (isEditMode && selectedSocial) {
                    await updateSocial(selectedSocial.id, socialFormData.link);
                } else {
                }
                resetSocialForm();
            }
            setShowFormModal(false);
            if (activeTab === 'contacts') {
                fetchContacts();
            } else {
                fetchSocials();
            }
        } catch (error) {
            console.error('Submit failed:', error);
        }
    };

    useEffect(() => {
        if (activeTab === 'contacts') {
            fetchContacts();
        } else {
            fetchSocials();
        }
    }, [activeTab]);

    return (
        <div className="container mx-auto font-sans">
            <div className="bg-gradient-to-b from-yellow-50 to-white p-6 rounded-lg shadow-md mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-3 md:mb-0">{activeTab === 'contacts' ? 'Contact' : 'Social'} Management</h1>

                        <div className="flex items-center space-x-3">
                            <button
                                onClick={activeTab === 'contacts' ? fetchContacts : fetchSocials}
                                className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                disabled={isLoading}
                            >
                                <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin text-yellow-600' : 'text-gray-600'}`} />
                                Refresh
                            </button>
                            <span className="text-sm text-gray-500 bg-white px-3 py-2 rounded-md border border-gray-200">
                                {activeTab === 'contacts' ? filteredContacts.length : filteredSocials.length} items found
                            </span>
                        </div>
                    </div>

                    <div className="flex space-x-1 mb-6">
                        <button
                            onClick={() => setActiveTab('contacts')}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'contacts' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <Phone size={16} className="inline mr-2" />
                            Contacts
                        </button>
                        <button
                            onClick={() => setActiveTab('socials')}
                            className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'socials' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            <Globe size={16} className="inline mr-2" />
                            Socials
                        </button>
                    </div>

                    <div className="relative max-w-md">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-12">
                            <div className="flex flex-col items-center">
                                <Loader className="animate-spin text-yellow-500 h-8 w-8 mb-3" />
                                <span className="text-gray-600">Loading {activeTab}...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        {activeTab === 'contacts' ? (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                        ) : (
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
                                        )}
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeTab === 'contacts'
                                        ? filteredContacts.map((contact) => (
                                              <tr key={contact.id} className="hover:bg-gray-50">
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{contact.data}</td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <div className="flex justify-end space-x-2">
                                                          <button
                                                              onClick={() => {
                                                                  setSelectedContact(contact);
                                                                  setShowViewModal(true);
                                                              }}
                                                              className="text-yellow-600 hover:text-yellow-900"
                                                          >
                                                              <Eye size={16} />
                                                          </button>
                                                          <button onClick={() => handleContactEdit(contact)} className="text-amber-600 hover:text-amber-900">
                                                              <Edit size={16} />
                                                          </button>
                                                      </div>
                                                  </td>
                                              </tr>
                                          ))
                                        : filteredSocials.map((social) => (
                                              <tr key={social.id} className="hover:bg-gray-50">
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{social.name}</td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                      <a href={social.link} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800">
                                                          {social.link}
                                                      </a>
                                                  </td>
                                                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <div className="flex justify-end space-x-2">
                                                          <button
                                                              onClick={() => {
                                                                  setSelectedSocial(social);
                                                                  setShowViewModal(true);
                                                              }}
                                                              className="text-yellow-600 hover:text-yellow-900"
                                                          >
                                                              <Eye size={16} />
                                                          </button>
                                                          <button onClick={() => handleSocialEdit(social)} className="text-amber-600 hover:text-amber-900">
                                                              <Edit size={16} />
                                                          </button>
                                                      </div>
                                                  </td>
                                              </tr>
                                          ))}
                                </tbody>
                            </table>

                            {((activeTab === 'contacts' && filteredContacts.length === 0) || (activeTab === 'socials' && filteredSocials.length === 0)) && !isLoading && (
                                <div className="text-center py-12">
                                    <div className="text-gray-500 mb-4">{searchTerm ? `No ${activeTab} found matching "${searchTerm}"` : `No ${activeTab} found`}</div>
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} className="text-yellow-600 hover:text-yellow-800">
                                            Clear search
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showViewModal && (selectedContact || selectedSocial) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">{activeTab === 'contacts' ? 'Contact Details' : 'Social Details'}</h3>
                            <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        {activeTab === 'contacts' && selectedContact && (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p className="text-gray-900">{selectedContact.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Data</label>
                                    <p className="text-gray-900">{selectedContact.data}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'socials' && selectedSocial && (
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p className="text-gray-900">{selectedSocial.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Link</label>
                                    <p className="text-gray-900">
                                        <a href={selectedSocial.link} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800">
                                            {selectedSocial.link}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-end space-x-3 mt-6">
                            <button onClick={() => setShowViewModal(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    if (activeTab === 'contacts' && selectedContact) {
                                        handleContactEdit(selectedContact);
                                    } else if (activeTab === 'socials' && selectedSocial) {
                                        handleSocialEdit(selectedSocial);
                                    }
                                }}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFormModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {isEditMode ? 'Edit' : 'Create'} {activeTab === 'contacts' ? 'Contact' : 'Social'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowFormModal(false);
                                    if (activeTab === 'contacts') {
                                        resetContactForm();
                                    } else {
                                        resetSocialForm();
                                    }
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {activeTab === 'contacts' ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name {isEditMode && <span className="text-gray-500">(Read-only)</span>}</label>
                                        <input
                                            type="text"
                                            value={contactFormData.name}
                                            onChange={(e) => setContactFormData((prev) => ({ ...prev, name: e.target.value }))}
                                            disabled={isEditMode}
                                            required
                                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                                                isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                                        <textarea
                                            value={contactFormData.data}
                                            onChange={(e) => setContactFormData((prev) => ({ ...prev, data: e.target.value }))}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Enter contact information (email, phone, address, etc.)"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name {isEditMode && <span className="text-gray-500">(Read-only)</span>}</label>
                                        <input
                                            type="text"
                                            value={socialFormData.name}
                                            onChange={(e) => setSocialFormData((prev) => ({ ...prev, name: e.target.value }))}
                                            disabled={isEditMode}
                                            required
                                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
                                                isEditMode ? 'bg-gray-100 cursor-not-allowed' : ''
                                            }`}
                                            placeholder="e.g., Facebook, Instagram, Twitter"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                                        <input
                                            type="url"
                                            value={socialFormData.link}
                                            onChange={(e) => setSocialFormData((prev) => ({ ...prev, link: e.target.value }))}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="https://example.com"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowFormModal(false);
                                        if (activeTab === 'contacts') {
                                            resetContactForm();
                                        } else {
                                            resetSocialForm();
                                        }
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isActionLoading}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 flex items-center"
                                >
                                    {isActionLoading && <Loader size={16} className="animate-spin mr-2" />}
                                    {isEditMode ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsSocialsManagement;

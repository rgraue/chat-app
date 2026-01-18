import { config } from '../utils/config';
import { WorkspaceService } from './workspaceService';


describe('WorkspaceService', () => {
    let service: WorkspaceService;
    beforeEach(() => {
        service = new WorkspaceService();
    });



    it('should create a conversation with the correct initial role', () => {
        service.createConversation('testConvo');
        expect(service.conversations[0].role).toBe('init');

    });



    it('should get active conversations correctly', () => {
        // Add test cases for retrieving active conversations

    });



    it('should add a query to the conversation with correct settings', async () => {
        await service.addQuery('testConvo', 'queryText');
        console.log(service.conversations);

        expect(service.conversations.some(async message =>
            message.conversationName === 'testConvo' &&
            message.role === (await config()).ROLE &&
            message.content === 'queryText'

        )).toBeTruthy();

    });



    it('should add a response to the conversation with correct settings', async () => {
        service.addResponse('testConvo', 'responseText');
        console.log(service.conversations);

        expect(service.conversations.some(message =>
            message.conversationName === 'testConvo' &&
            message.role === 'system' &&
            message.content === 'responseText'
        )).toBeTruthy();
    });

    it('should get a conversation correctly', async () => {
        service.createConversation('testConvo');
        await service.addQuery('testConvo', 'testMessage')

        const expectedRole = (await config()).ROLE
        expect(service.getConversation('testConvo')[0]).toEqual({
            conversationName: 'testConvo',
            role: expectedRole,
            content: 'testMessage'
        });

    });


    it('should clear all conversations correctly', () => {
        service.clearAllConversations();
        expect(service.conversations.length).toBe(0);
    });



    it('should remove a specific conversation correctly', () => {
        // Add test cases for clearing or removing specific conversations

    });

});
import { notes, notebooks, notebookRelations, noteRelations } from '@/db/schema/notebooks';
import { account, session, user, verification } from '@/db/schema/better-auth';

export const schema = {notes, notebooks, user, account, session, verification, notebookRelations, noteRelations};
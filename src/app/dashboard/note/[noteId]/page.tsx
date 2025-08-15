import { getNoteById } from '@/server/notes';
import PageWrapper from '@/components/dashboard/page-wrapper';

type Params = Promise<{
    noteId: string;
}>;

const NotePage = async ({ params }: { params: Params }) => {
    const { noteId } = await params;
    const {note} = await getNoteById(noteId);

    return (
        <PageWrapper breadcrumbs={[{label: 'Dashboard', href: '/dashboard'}, {label: note?.title ?? 'Note', href: `/dashboard/note/${noteId}`}]}>
            <h1>{note?.title}</h1>
        </PageWrapper>
    )
};

export default NotePage;

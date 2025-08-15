import PageWrapper from '@/components/dashboard/page-wrapper';
import { getNotebooks } from '@/server/notebooks';
import { CreateNotebookButton } from '@/components/notebook/create-notebook-button';

const Dashboard = async () => {
    const notebooks = await getNotebooks();

    return (
        <PageWrapper breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }]}>
            <CreateNotebookButton/>
            {notebooks.success && notebooks?.notebooks?.map((notebook) => <div key={notebook.id}>{notebook.name}</div>)}
            {notebooks.success && notebooks?.notebooks?.length === 0 && <div>No notebooks found</div>}
        </PageWrapper>
    );
};

export default Dashboard;

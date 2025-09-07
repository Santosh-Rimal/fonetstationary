
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit, Eye, Trash } from 'lucide-react';
import galleries from '@/routes/galleries';
import GalleryController from '@/actions/App/Http/Controllers/GalleryController';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gallery',
        href: GalleryController.index.url(),
    },
];
interface Gallery {
    id: number;
    title: string;
    description: string;
    gallery_image: string;
};
export default function Galleries({ ...props }: { galleries: Gallery[] }) {
    const { galleries } = props;
    const { flash } = usePage<{ flash: { error?: string, success?: string } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gallery" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link className='bg-blue-400 w-fit p-2 rounded' href={GalleryController.create.url()}>Add Photo</Link>
                {
                    flash.success && (
                        <Alert
                            className={`flex justify-center px-4 py-2 rounded-md mb-4 shadow-md 
              ${flash?.success
                                    ? 'bg-green-500 animate-pulse'
                                    : 'bg-red-500 animate-bounce'}`}
                        >
                            <AlertDescription className="text-white">
                                {flash?.success || flash?.error}
                            </AlertDescription>
                        </Alert>

                    )
                }
                <Table className='border rounded'>
                    <TableCaption>All Gallery Details</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Sn</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {
                            galleries.length > 0 ? galleries.map((gallery, index) => (
                                <TableRow>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{gallery?.title}</TableCell>
                                    <TableCell>{gallery?.description}</TableCell>
                                    <TableCell>
                                        {gallery?.gallery_image ? (
                                            <img src={gallery?.gallery_image} alt={gallery.title} className="w-12 h-12 object-cover rounded" />
                                        ) : (
                                            'No Image'
                                        )}
                                    </TableCell>


                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <button onClick={(e) => {
                                            if (confirm('Are you sure to Delete this Service')) {
                                                router.delete(GalleryController.destroy.url(gallery.id)), {
                                                    preserveScroll: true,
                                                }
                                            }
                                        }} className="text-red-600 hover:cursor-pointer">
                                            <Trash />
                                        </button>
                                        <button onClick={() => { router.get(GalleryController.edit.url(gallery.id)) }} className="text-blue-600 hover:cursor-pointer">
                                            <Edit />
                                        </button>
                                        <button onClick={() => { router.get(GalleryController.show.url(gallery.id)) }} className="text-green-600 hover:cursor-pointer">
                                            <Eye />
                                        </button>
                                    </TableCell>
                                </TableRow>)
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">
                                        No galleries found.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>

                </Table>
            </div>
        </AppLayout>
    );
}
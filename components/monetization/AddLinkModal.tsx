'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { addMonetizationLink } from '@/app/actions/monetization';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface AddLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: 'product' | 'booking' | 'affiliate';
}

export function AddLinkModal({ isOpen, onClose, category }: AddLinkModalProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        price: '',
        coverImage: '',
    });

    const getCategoryInfo = () => {
        switch (category) {
            case 'product':
                return {
                    title: 'Add Digital Product',
                    description: 'Add a link to your Gumroad product, course, or any digital product',
                    placeholder: {
                        title: 'Next.js SaaS Template',
                        url: 'https://gumroad.com/l/your-product',
                        description: 'Full-stack SaaS starter with authentication, payments, and more',
                    },
                };
            case 'booking':
                return {
                    title: 'Add Booking Link',
                    description: 'Add a link to your Topmate, Cal.com, or Calendly booking page',
                    placeholder: {
                        title: '1-Hour Code Review',
                        url: 'https://topmate.io/your-username',
                        description: 'Get expert feedback on your code and architecture',
                    },
                };
            case 'affiliate':
                return {
                    title: 'Add Affiliate Link',
                    description: 'Add an affiliate link to a tool or service you recommend',
                    placeholder: {
                        title: 'Vercel - Best Next.js Hosting',
                        url: 'https://vercel.com?ref=your-affiliate-id',
                        description: 'Deploy your Next.js apps with zero configuration',
                    },
                };
        }
    };

    const info = getCategoryInfo();

    // Handle file upload and convert to base64
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a valid image file (JPG, PNG, WEBP, or GIF)');
            return;
        }

        // Validate file size (2MB max)
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (file.size > maxSize) {
            toast.error('Image size must be less than 2MB');
            return;
        }

        setIsUploading(true);

        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData({ ...formData, coverImage: base64String });
                setImagePreview(base64String);
                setIsUploading(false);
                toast.success('Image uploaded successfully!');
            };
            reader.onerror = () => {
                toast.error('Failed to read image file');
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            toast.error('Failed to upload image');
            setIsUploading(false);
        }
    };

    // Handle URL input for cover image
    const handleCoverImageUrlChange = (url: string) => {
        setFormData({ ...formData, coverImage: url });
        setImagePreview(url);
    };

    // Remove cover image
    const handleRemoveImage = () => {
        setFormData({ ...formData, coverImage: '' });
        setImagePreview('');
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await addMonetizationLink({
            category,
            title: formData.title,
            description: formData.description || undefined,
            url: formData.url,
            price: formData.price ? parseInt(formData.price) * 100 : undefined, // Convert to paise
            coverImage: formData.coverImage || undefined,
        });

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Link added successfully!');
            setFormData({ title: '', description: '', url: '', price: '', coverImage: '' });
            router.refresh();
            onClose();
        }

        setIsSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-700 text-white sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-green-400 font-mono">{info.title}</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        {info.description}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <Label htmlFor="title" className="text-slate-300">
                            Title *
                        </Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder={info.placeholder.title}
                            required
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-slate-300">
                            Description (optional)
                        </Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder={info.placeholder.description}
                            rows={3}
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <Label htmlFor="url" className="text-slate-300">
                            URL *
                        </Label>
                        <Input
                            id="url"
                            type="url"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            placeholder={info.placeholder.url}
                            required
                            className="bg-slate-800 border-slate-700 text-white"
                        />
                    </div>

                    {/* Price (for products and booking) */}
                    {(category === 'product' || category === 'booking') && (
                        <div>
                            <Label htmlFor="price" className="text-slate-300">
                                Price (optional, for display only)
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400">₹</span>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="999"
                                    className="bg-slate-800 border-slate-700 text-white"
                                />
                            </div>
                        </div>
                    )}

                    {/* Cover Image (for products) */}
                    {category === 'product' && (
                        <div className="space-y-3">
                            <Label className="text-slate-300">
                                Cover Image (optional)
                            </Label>

                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Cover preview"
                                        className="w-full h-48 object-cover rounded-lg border border-slate-700"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-red-900/80 border-red-700 text-red-300 hover:bg-red-800"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}

                            {/* Upload Options */}
                            {!imagePreview && (
                                <div className="space-y-3">
                                    {/* File Upload Button */}
                                    <div>
                                        <input
                                            type="file"
                                            id="coverImageFile"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                                            onChange={handleFileChange}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => document.getElementById('coverImageFile')?.click()}
                                            disabled={isUploading}
                                            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                                        >
                                            {isUploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Uploading...
                                                </>
                                            ) : (
                                                <>
                                                    📁 Upload from Computer
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-xs text-slate-500 mt-1">
                                            JPG, PNG, WEBP, or GIF (max 2MB)
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-slate-700"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 bg-slate-900 text-slate-500">or use URL</span>
                                        </div>
                                    </div>

                                    {/* URL Input */}
                                    <Input
                                        id="coverImageUrl"
                                        type="url"
                                        value={formData.coverImage.startsWith('data:') ? '' : formData.coverImage}
                                        onChange={(e) => handleCoverImageUrlChange(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                'Add Link'
                            )}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

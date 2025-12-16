import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserProfileByClerkId } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, AlertCircle } from 'lucide-react';

export default async function ResumePage() {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const userProfile = await getUserProfileByClerkId(userId);

    if (!userProfile?.profile) {
        redirect('/');
    }

    const { profile } = userProfile;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-400 font-mono mb-2">{'>'} Resume</h1>
                <p className="text-slate-400">Upload your resume for visitors to download</p>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-green-400 font-mono flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        Resume Upload
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        Upload a PDF version of your resume
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {profile.resumeUrl ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg">
                                <p className="text-green-400 font-mono flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Resume uploaded successfully
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                                    onClick={() => window.open(profile.resumeUrl!, '_blank')}
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Preview Resume
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-red-700 text-red-400 hover:bg-red-900/20"
                                >
                                    Remove Resume
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-900/20 border border-blue-700 rounded-lg flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-blue-300">
                                    <p className="font-semibold mb-1">File Storage Setup Required</p>
                                    <p>
                                        To enable resume uploads, you need to configure a file storage solution like Vercel Blob or AWS S3.
                                        This feature will be available once storage is configured.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
                                <h3 className="font-semibold text-white mb-2 font-mono">Recommended Setup:</h3>
                                <ol className="text-sm text-slate-400 space-y-2 list-decimal list-inside">
                                    <li>Install Vercel Blob: <code className="text-green-400">npm install @vercel/blob</code></li>
                                    <li>Add <code className="text-green-400">BLOB_READ_WRITE_TOKEN</code> to environment variables</li>
                                    <li>Create upload API route with file validation</li>
                                    <li>Return here to upload your resume</li>
                                </ol>
                            </div>

                            <div className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center">
                                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                                <p className="text-slate-400 mb-2">File upload coming soon</p>
                                <p className="text-sm text-slate-500">PDF files only, max 5MB</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 mt-6">
                <CardHeader>
                    <CardTitle className="text-green-400 font-mono">Resume Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm text-slate-400 space-y-2">
                        <li>• Keep your resume updated and relevant to your target roles</li>
                        <li>• Use a clean, professional format that's easy to read</li>
                        <li>• Highlight your key achievements and technical skills</li>
                        <li>• Include links to your portfolio and GitHub profile</li>
                        <li>• Keep it concise - ideally 1-2 pages</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

<?php

namespace App\Action\Blog;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GetBlogById
{
    public function __invoke($id): array
    {
        try {
            $blog = DB::table('blogs')
                ->where('id', $id)
                ->select('id', 'title', 'category', 'image', 'writer', 'date', 'description')
                ->first();

            if (!$blog) {
                return CommonResponse::sendBadRequestResponse('Blog not found.');
            }

            $blogData = [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'image' => $this->getImageData($blog->image),
                'writer' => $blog->writer,
                'date' => $blog->date,
                'description' => $blog->description,
            ];

            return CommonResponse::sendSuccessResponseWithData('Blog fetched successfully.', $blogData);
        } catch (\Exception $e) {
            Log::error('GetBlogById Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve blog: ' . $e->getMessage());
        }
    }

    private function getImageData($imagePath): ?string
    {
        try {
            if (empty($imagePath)) {
                return null;
            }

            $storagePath = str_replace('storage/', 'public/', $imagePath);

            if (Storage::exists($storagePath)) {
                $binaryData = Storage::get($storagePath);
                $mimeType = Storage::mimeType($storagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            Log::warning("Image not found: {$imagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting image data: ' . $e->getMessage());
            return null;
        }
    }
}

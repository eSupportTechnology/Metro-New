<?php

namespace App\Action\Blog;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GetAllBlogs
{
    public function __invoke(): array
    {
        try {
            $blogs = DB::table('blogs')
                ->select(
                    'blogs.id',
                    'blogs.title',
                    'blogs.category',
                    'blogs.image',
                    'blogs.writer',
                    'blogs.date',
                    'blogs.description',
                )
                ->get();

            $groupedBlogs = $this->groupBlogs($blogs);

            return CommonResponse::sendSuccessResponseWithData('Blogs fetched successfully.', $groupedBlogs);
        } catch (\Exception $e) {
            Log::error('GetAllBlogs Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve blogs: ' . $e->getMessage());
        }
    }

    private function groupBlogs($blogs): array
    {
        $groupedBlogs = [];

        foreach ($blogs as $blog) {
            $groupedBlogs[] = [
                'id' => $blog->id,
                'title' => $blog->title,
                'category' => $blog->category,
                'image' => $this->getImageData($blog->image),
                'writer' => $blog->writer,
                'date' => $blog->date,
                'description' => $blog->description,
            ];
        }

        return $groupedBlogs;
    }

    private function getImageData($imagePath): ?string
    {
        try {
            if (Storage::exists($imagePath)) {
                $binaryData = Storage::get($imagePath);
                $mimeType = Storage::mimeType($imagePath);
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


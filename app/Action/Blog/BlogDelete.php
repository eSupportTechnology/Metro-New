<?php

namespace App\Action\Blog;

use App\Models\Blog;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class BlogDelete
{
    public function __invoke(string $blogId): array
    {
        DB::beginTransaction();
        try {
            $blog = Blog::find($blogId);

            if (!$blog) {
                DB::rollBack();
                return CommonResponse::sendBadRequestResponse('Blog not found.');
            }
            $this->deleteBlogImage($blog);

            $blog->delete();

            DB::commit();

            return CommonResponse::sendSuccessResponse('Blog and related data deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('BlogDelete Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to delete blog: ' . $e->getMessage());
        }
    }

    private function deleteBlogImage(Blog $blog): void
    {
        if ($blog->image) {
            $imagePath = $blog->image;
            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
        }
    }
}

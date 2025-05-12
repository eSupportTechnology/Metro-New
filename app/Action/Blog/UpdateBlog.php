<?php

namespace App\Action\Blog;

use App\Models\Blog;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UpdateBlog
{
    public function __invoke(array $validatedData, $id): array
    {
        try {
            $blog = Blog::findOrFail($id);

            if (isset($validatedData['image'])) {
                if ($blog->image && Storage::exists(str_replace('storage/', 'public/', $blog->image))) {
                    Storage::delete(str_replace('storage/', 'public/', $blog->image));
                }

                $image = $validatedData['image'];
                $path = $image->storeAs('public/blogs', $image->getClientOriginalName());
                $validatedData['image'] = str_replace('public/', 'storage/', $path);
            }

            $blog->update($validatedData);

           return CommonResponse::sendSuccessResponse('Blog updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating blog: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to update blog: ' . $e->getMessage());
        }
    }
}


<?php

namespace App\Action\Blog;

use App\Models\Blog;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\Log;

class CreateBlog
{
    public function __invoke(array $validatedData): array
    {
        try {
            if (isset($validatedData['image'])) {
                $image = $validatedData['image'];
                $path = $image->storeAs('public/blogs', $image->getClientOriginalName());
                $validatedData['image'] = str_replace('public/', 'storage/', $path);
            }

            Blog::create($validatedData);

            return CommonResponse::sendSuccessResponse('Blog created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating blog: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to create blog: ' . $e->getMessage());
        }
    }
}

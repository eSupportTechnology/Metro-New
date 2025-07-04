<?php

namespace App\Http\Controllers;

use App\Action\Blog\BlogDelete;
use App\Action\Blog\CreateBlog;
use App\Action\Blog\GetAllBlogs;
use App\Action\Blog\GetBlogById;
use App\Action\Blog\UpdateBlog;
use App\Http\Requests\StoreBlogRequest;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function createBlog(StoreBlogRequest $request, CreateBlog $action): JsonResponse
    {
        $validatedData = $request->validated();
        return response()->json($action($validatedData));
    }

    public function updateBlog(StoreBlogRequest $request, $id, UpdateBlog $action): JsonResponse
    {
        $validatedData = $request->validated();
        return response()->json($action($validatedData, $id));
    }

    public function getAllBlogs(GetAllBlogs $getAllBlogs): JsonResponse
    {
        return response()->json($getAllBlogs());
    }

    public function deleteBlog(string $id, BlogDelete $blogDelete): JsonResponse
    {
        return response()->json($blogDelete($id));
    }

    public function getBlogById($id, GetBlogById $getBlogById): JsonResponse
    {
        return response()->json($getBlogById($id));
    }

}

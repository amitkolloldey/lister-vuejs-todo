<?php

namespace App\Http\Controllers;

use App\Todo;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Todo[]|Collection
     */
    public function index()
    {
        return Todo::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'required|boolean'
        ]);

        $todo = Todo::create($data);

        return response($todo, 201);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Todo $todo
     * @return Application|ResponseFactory|Response
     */
    public function update(Request $request, Todo $todo)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'completed' => 'required|boolean'
        ]);

        $todo->update($data);

        return response($todo, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Todo $todo
     * @return Response
     * @throws Exception
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response($todo, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function completeAll(Request $request)
    {
        $data = $request->validate([
            'completed' => 'required|boolean'
        ]);

        Todo::query()->update($data);

        return response($request->completed, 200);
    }

    /**
     * Deleting the completed todo.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function clearCompleted(Request $request)
    {
        $request->validate([
            'todos' => 'required|array'
        ]);

        Todo::destroy($request->todos);

        return response($request->todos, 200);
    }
}

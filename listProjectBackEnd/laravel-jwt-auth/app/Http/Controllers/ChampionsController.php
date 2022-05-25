<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChampionsRequest;
use App\Http\Requests\UpdateChampionsRequest;
use App\Models\Champions;
use Log;
use Illuminate\Http\Request;


class ChampionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listaCampioni = Champions::orderBy('name','asc')
        ->get();

        return $listaCampioni;
    }




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data=$request->all();
        log::info($data);
        $name=$data['name'];
        
        $descriptions=$data['description'];


        $campione = new Champions();

        $campione->name  = $name;
        $campione->description = $descriptions;
        $campione->save();
        return response('Personaggio creato');
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @param  \App\Models\Champions  $champions
     * @return \Illuminate\Http\Response
     */
    public function show($id)

    {
        $query= Champions::where('id', $id)->get();
        return $query;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Champions  $champions
     * @return \Illuminate\Http\Response
     */
    public function edit(Champions $champions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)

       
    {
        $campione= Champions::where('id',$id)->first();
        $campione->name = $request->name;
        $campione->description = $request->description;
        $campione->save();
        return response ('Personaggio Aggiornato');


    }

    /**
     * Remove the specified resource from storage.
     * @param  int  $id
     * @param  \App\Http\Requests\Request  $request
     * @param  \App\Models\Champions  $champions
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
            $campione = Champions::destroy($id);
            return $campione;
         
    }
}

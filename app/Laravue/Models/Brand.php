<?php

namespace App\Laravue\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = ['name', 'desc', 'image_path'];
}

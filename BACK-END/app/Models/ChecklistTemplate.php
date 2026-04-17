<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;



#[Fillable([
    'name',
    'description',
    'created_by',
])]

class ChecklistTemplate extends Model
{
    use HasFactory, SoftDeletes ; 

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by') ;
    }

    public function checklistItems()
    {
        return $this->belongsToMany(
            ChecklistItem::class,
            'checklist_template_items' , 
            'checklist_template_id' , 
            'checklist_item_id'
        )->using(ChecklistTemplateItem::class)
         ->withPivot('id' , 'order')
         ->withTimestamps() ;
    }

}

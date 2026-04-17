<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'label',
])]

class ChecklistItem extends Model
{
    use HasFactory;


    public function checklistTemplate()
    {
        return $this->belongsToMany(
            ChecklistTemplate::class,
            'checklist_template_items' , 
            'checklist_template_id' , 
            'checklist_item_id'
        )->using(ChecklistTemplateItem::class)
         ->withPivot('id' , 'order')
         ->withTimestamps() ;
    }


}

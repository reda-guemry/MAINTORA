<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'machine_id',
    'checklist_template_id',
    'assigned_to',
    'repeat_every',
    'repeat_unit',
    'start_date',
    'status',
])]
class MaintenancePlan extends Model
{
    use HasFactory ;


    public function machine()
    {
        return $this->belongsTo(Machine::class) ;
    }

    public function checklistTemplate()
    {
        return $this->belongsTo(ChecklistTemplate::class) ;
    }

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to') ;
    }


    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by') ;
    }
    

}

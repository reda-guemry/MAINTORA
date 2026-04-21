<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'checklist_item_id',
    'status',
    'comment',
])]
class MaintenanceTaskCheck extends Model
{
    use HasFactory ;

    protected $table = 'maintenance_task_check_items';


    public function maintenanceTask()
    {
        return $this->belongsTo(MaintenanceTask::class) ;
    }

    public function checklistItem()
    {
        return $this->belongsTo(ChecklistItem::class) ;
    }


}

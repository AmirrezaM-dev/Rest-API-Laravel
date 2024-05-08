<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
		$userIds = $this->users->pluck('id')->toArray();
        return [
            'id' => $this->id,
			"name" => $this->name,
			"department" => $this->department,
			'start_date' => $this->start_date instanceof \DateTime ? $this->start_date->format('Y/m/d') : $this->start_date,
        	'end_date' => $this->end_date instanceof \DateTime ? $this->end_date->format('Y/m/d') : $this->end_date,
			"status" => $this->status,
			'isAssigned' => in_array(Auth::id(), $userIds),
        ];
    }
}

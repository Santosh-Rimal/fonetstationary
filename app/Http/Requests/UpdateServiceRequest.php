<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // 'name' => 'required|string|min:6',
            // 'price' => 'required|integer|min:2',
            // 'offer_price' => 'nullable|integer|min:0',
            // 'discount' => 'nullable|integer|max:100',
            // 'service_image' => 'nullable|image|mimes:png,jpg,jpeg,gif', // <-- optional on update
            // 'description' => 'required|string'
        ];
    }
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

exports.default = "\nconst float R_EARTH = 6371000.; // earth radius in meter\n\n// uniform for brushing\nuniform vec2 mousePos;\nuniform float brushRadius;\n\n// approximate distance between lng lat in meters\nfloat distanceBetweenLatLng(vec2 source, vec2 target) {\n\n  vec2 delta = (source - target) * PI / 180.;\n\n  float a =\n    sin(delta.y / 2.) * sin(delta.y / 2.) +\n    cos(source.y * PI / 180.) * cos(target.y * PI / 180.) *\n    sin(delta.x / 2.) * sin(delta.x / 2.);\n\n  float c = 2. * atan(sqrt(a), sqrt(1. - a));\n\n  return R_EARTH * c;\n}\n\n// range is km\nfloat isPointInRange(vec2 ptLatLng, float enabled) {\n\n  return float(enabled <= 0. || distanceBetweenLatLng(ptLatLng, mousePos) <= brushRadius);\n}\n";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaGFkZXJsaWIvaXMtcG9pbnQtaW4tcmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJpcy1wb2ludC1pbi1yYW5nZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOCBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmV4cG9ydCBkZWZhdWx0IGBcXFxuXG5jb25zdCBmbG9hdCBSX0VBUlRIID0gNjM3MTAwMC47IC8vIGVhcnRoIHJhZGl1cyBpbiBtZXRlclxuXG4vLyB1bmlmb3JtIGZvciBicnVzaGluZ1xudW5pZm9ybSB2ZWMyIG1vdXNlUG9zO1xudW5pZm9ybSBmbG9hdCBicnVzaFJhZGl1cztcblxuLy8gYXBwcm94aW1hdGUgZGlzdGFuY2UgYmV0d2VlbiBsbmcgbGF0IGluIG1ldGVyc1xuZmxvYXQgZGlzdGFuY2VCZXR3ZWVuTGF0TG5nKHZlYzIgc291cmNlLCB2ZWMyIHRhcmdldCkge1xuXG4gIHZlYzIgZGVsdGEgPSAoc291cmNlIC0gdGFyZ2V0KSAqIFBJIC8gMTgwLjtcblxuICBmbG9hdCBhID1cbiAgICBzaW4oZGVsdGEueSAvIDIuKSAqIHNpbihkZWx0YS55IC8gMi4pICtcbiAgICBjb3Moc291cmNlLnkgKiBQSSAvIDE4MC4pICogY29zKHRhcmdldC55ICogUEkgLyAxODAuKSAqXG4gICAgc2luKGRlbHRhLnggLyAyLikgKiBzaW4oZGVsdGEueCAvIDIuKTtcblxuICBmbG9hdCBjID0gMi4gKiBhdGFuKHNxcnQoYSksIHNxcnQoMS4gLSBhKSk7XG5cbiAgcmV0dXJuIFJfRUFSVEggKiBjO1xufVxuXG4vLyByYW5nZSBpcyBrbVxuZmxvYXQgaXNQb2ludEluUmFuZ2UodmVjMiBwdExhdExuZywgZmxvYXQgZW5hYmxlZCkge1xuXG4gIHJldHVybiBmbG9hdChlbmFibGVkIDw9IDAuIHx8IGRpc3RhbmNlQmV0d2VlbkxhdExuZyhwdExhdExuZywgbW91c2VQb3MpIDw9IGJydXNoUmFkaXVzKTtcbn1cbmA7XG4iXX0=
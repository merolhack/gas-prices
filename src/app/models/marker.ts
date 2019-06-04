// just an interface for type safety.
export class Marker {
    constructor(public lat: string, public lng: string, public label?: string, public draggable: boolean = false) {}
}

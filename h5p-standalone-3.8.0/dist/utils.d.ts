export declare function urlPath(path: string): string;
export declare function getJSON<T>(url: string, requestOptions?: RequestInit): Promise<T>;
export declare function loadScripts(target: HTMLElement, scripts: string[]): Promise<void>;
export declare function loadStylesheets(target: HTMLElement, styles: string[]): void;
export declare function mergeObject<T>(target: any, ...sources: any): T;
export declare function mergeArrayUnique(array1: string[], array2: string[]): string[];

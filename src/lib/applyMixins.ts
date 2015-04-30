/**
 * Usage:
 *      applyMixins(SmartObject, [Disposable, Activatable]);
 *
 *      class SmartObject implements Disposable, Activatable {
 *          // Create stand-in properties and their types for the members from our mixins to satisfy compiler:
 *
 *          // Disposable
 *          isDisposed: boolean = false;
 *          dispose: () => void;
 *          // Activatable
 *          isActive: boolean = false;
 *          activate: () => void;
 *          deactivate: () => void;
 *      }
 *
 * @param derivedCtor
 * @param baseCtors
 */
function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

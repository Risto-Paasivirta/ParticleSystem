import { ModuleTypeReference } from "./moduleRegistry";

export const loadSerializedProperty = <
    ModuleType extends ModuleTypeReference,
    ModuleInstanceType,
    PropertyKey extends keyof ModuleInstanceType,
>(
    object: object,
    moduleType: ModuleType,
    module: ModuleInstanceType,
    key: PropertyKey,
    deserializeValue: (value: unknown) => ModuleInstanceType[typeof key] | undefined,
): void => {
    const value = object[key as keyof object];
    if (value === undefined) {
        console.warn(`Missing module property ${moduleType.moduleTypeId}: "${key}"`);
        return;
    }

    const deserializedValue = deserializeValue(value);
    if (deserializedValue === undefined) {
        console.warn(`Module property could not be deserialized ${moduleType.moduleTypeId}: "${key}"`);
        return;
    }

    module[key] = deserializedValue;
};

/**
 * Function for satisfying types when deserializing a primitive data type.
 *
 * Examples of primitive data types:
 * - `property = 1.0`
 * - `property = 'hello'`
 * - `property = { x: 1.0, something: 'text' }`
 * - `property = [ 0.0, 1.0 ]`
 *
 * @param serializedPrimitiveDataType
 * @returns
 */
export const deserializePrimitiveDataType = <T>(serializedPrimitiveDataType: unknown): T => {
    return serializedPrimitiveDataType as T;
};

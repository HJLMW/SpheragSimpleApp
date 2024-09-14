export interface Atlas {
	imei: string
	name: string
	type: AtlasType,
	productTypeName?: string
	systemId: number
	latitude: string
	longitude: string
	batteryPercentage: number
	signalPercentage: number
	expiredDate: string
	atlasStatus: AtlasStatus,
	energyMode: EneryMode,
	connectors: Connectors
}

export interface Connectors {
	input: Input[]
	output: Output[]
	sensor: Sensor[]
}

export interface Input {
	connectorNumber: number
	id: number
	atlasId: number
	name: string
	type: number
	latitude: string
	longitude: string
	sensorTypeId: any
	flowmeter?: Flowmeter
	digitalInput?: DigitalInput
	pump: any
	valve: any
	mixer: any
	fertilizer: any
	sensor: any
}

export interface Flowmeter {
	pulse: Pulse
	offset: Offset
	accumulated24: Accumulated24
	nominalFlow: NominalFlow
}

export interface Pulse {
	pulseId: number
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface Offset {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface Accumulated24 {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface NominalFlow {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface DigitalInput {
	status: number
	isNormallyOpen: boolean
	digitalInputType: number
}

export interface Output {
	connectorNumber: number
	id: number
	atlasId: number
	name: string
	type: number
	latitude: string
	longitude: string
	sensorTypeId: any
	flowmeter: any
	digitalInput: any
	pump?: Pump
	valve?: Valve
	mixer?: Mixer
	fertilizer?: Fertilizer
	sensor: any
}

export interface Pump {
	power: Power
	nominalFlow: NominalFlow2
	price: Price
	mode: number
	status: number
}

export interface Power {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface NominalFlow2 {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface Price {
	value: number
	id: number
	name: string
	code: string
	number: number
	symbol: string
}

export interface Valve {
	isMaster: boolean
	nominalFlow: NominalFlow3
	mode: number
	status: number
}

export interface NominalFlow3 {
	value: number
	unitTypeId: number
	name: string
	symbol: string
	unitTypeGroupId: number
}

export interface Mixer {
	mode: number
	status: number
}

export interface Fertilizer {
	mode: number
	status: number
}

export interface Sensor {
	connectorNumber: number
	id: number
	atlasId: number
	name: string
	type: number
	latitude: string
	longitude: string
	sensorTypeId: number
	flowmeter: any
	digitalInput: any
	pump: any
	valve: any
	mixer: any
	fertilizer: any
	sensor: Sensor2
}

export interface Sensor2 {
	values: any[]
	initialDepth: any
	sensorCustomChannels: any[]
}

export enum AtlasStatus {
	"Dormido" = 1,
	"Dormido sin comunicación" = 2,
	"Dormido sin batería" = 3,
	"Dormido con batería baja" = 4,
	"Dormido con señal baja" = 5,
	"Dormido con batería y señal bajas" = 6,
	"RealTime" = 7,
	"RealTime sin comunicación" = 8,
	"RealTime sin batería" = 9,
	"RealTime con batería baja" = 10,
	"RealTime con señal baja" = 11,
	"RealTime con batería y señal bajas" = 12
}

export const AtlasStatusColor: { [key in AtlasStatus]: string } = {
	[AtlasStatus["Dormido"]]: "#b7bec6",
	[AtlasStatus["Dormido sin comunicación"]]: "#b7bec6",
	[AtlasStatus["Dormido sin batería"]]: "#b7bec6",
	[AtlasStatus["Dormido con batería baja"]]: "#fcb900",
	[AtlasStatus["Dormido con señal baja"]]: "#fcb900",
	[AtlasStatus["Dormido con batería y señal bajas"]]: "#fcb900",

	[AtlasStatus["RealTime"]]: "#00d082",
	[AtlasStatus["RealTime sin comunicación"]]: "#fcb900",
	[AtlasStatus["RealTime sin batería"]]: "#ff0000",
	[AtlasStatus["RealTime con batería baja"]]: "#ff6600",
	[AtlasStatus["RealTime con señal baja"]]: "#ff6600",
	[AtlasStatus["RealTime con batería y señal bajas"]]: "#ff0000"
};

export enum AtlasType {
	"Sensor Humedad" = 0,
	"Medidor Flujo" = 1,
	"Controlador Riego" = 2,
	"Estacion Meteorologica" = 3,
	"Bomba" = 4,
	"Valvula" = 5,
	"Medidor Presion" = 6,
	"Tanque Almacenamiento" = 7,
	"Filtrador" = 8,
	"Medidor Nivel" = 9,
	"Controlador Nivel" = 10,
	"Sistema Alarma" = 11,
	"Controlador PH" = 12,
	"Sensor Temperatura" = 13,
	"Medidor Conductividad" = 14,
	"Valvula Presion" = 15,
	"Analizador Agua" = 16,
	"Sistema Ventilacion" = 17,
	"Detector Fugas" = 18,
	"Controlador Automatizado" = 19
}

export enum EneryMode {
	"Real Time" = 0,
	"Eco" = 1,
	"Sleep" = 2
}
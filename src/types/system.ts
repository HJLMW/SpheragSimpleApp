export interface System {
	id: number
	measuringSystemTypeId: number
	timeZone: string
	latitude: string
	longitude: string
	name: string
	timeZoneStandard: string
	description: string
	image: string
	country: string
	favourite: boolean
	currencyTypeId: number
	currencySymbol: string
	createdDate: Date
	type: number
}
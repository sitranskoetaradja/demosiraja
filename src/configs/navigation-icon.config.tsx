import {
	PiHouseLineDuotone,
	PiPackageDuotone,
	PiDatabaseDuotone,
	PiClipboardTextDuotone,
	PiCouchDuotone,
	PiArrowsInDuotone,
	PiBookOpenUserDuotone,
	PiBookBookmarkDuotone,
	PiAcornDuotone,
	PiBagSimpleDuotone,
	PiBusDuotone,
	PiStorefrontDuotone,
	PiBookDuotone,
	PiMapTrifoldDuotone,
	PiIdentificationBadgeDuotone,
} from 'react-icons/pi'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
	home: <PiHouseLineDuotone />,
	inventory: <PiPackageDuotone />,
	transaction: <PiClipboardTextDuotone />,
	master: <PiDatabaseDuotone />,
	singleMenu: <PiAcornDuotone />,
	collapseMenu: <PiArrowsInDuotone />,
	groupSingleMenu: <PiBookOpenUserDuotone />,
	groupCollapseMenu: <PiBookBookmarkDuotone />,
	groupMenu: <PiBagSimpleDuotone />,
	facility: <PiCouchDuotone />,
	bus: <PiBusDuotone />,
	halte: <PiStorefrontDuotone />,
	documentation: <PiBookDuotone />,
	track: <PiMapTrifoldDuotone />,
	user: <PiIdentificationBadgeDuotone />,
}

export default navigationIcon

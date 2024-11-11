import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Image, Input } from '@nextui-org/react';
import { SearchIcon } from './SearchIcon.jsx';
import DataTable from './DataTable.jsx';
import '../index.js';

const SearchCard = ({ busData }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter data based on searchQuery across all columns (id, routeId, tripId)
    const filteredData = busData.filter(bus =>
        Object.keys(bus).some(key =>
            bus[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <Card style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <CardHeader
                className="flex gap-3"
                style={{
                    display: 'flex',
                    marginTop: '5%',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <div className="imageContainer" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        alt="nextui logo"
                        height={50}
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={50}
                        style={{ borderRadius: '25px', marginLeft: '20px' }}
                    />
                </div>
                <div style={{ flexGrow: 5 }}>
                    <p style={{ fontSize: '40px', margin: 0, marginLeft: 20 }}>Buses</p>
                </div>
            </CardHeader>
            <CardBody>
                <Input
                    label="Search"
                    isClearable
                    radius="lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    classNames={{
                        label: "text-black/50 dark:text-white/90",
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    }}
                    placeholder="Search by any field"
                    startContent={
                        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <div style={{ marginTop: '20px' }}>
                    <DataTable data={filteredData} />
                </div>
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    );
};

export default SearchCard;

import React, { useState } from 'react';
import Header from './Header';
import Section from './Section';
import List from './List';
import Form from '../example2/Form';

const Container = () => {
    const [records, setRecords] = useState([]);
    const [liveText, setLiveText] = useState('');

    const onSubmitHandler = entry => {
        setRecords([...records, entry].sort((a, b) => {
            if (a.recordName < b.recordName) {
                return -1;
            }
            if (a.recordName > b.recordName) {
                return 1;
            }
            return 0;
        }));

        setLiveText(`${entry.recordName} successfully added.`);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main>
                <Section headingText="Add a new favourite">
                    <Form onSubmit={onSubmitHandler} />
                </Section>
                <Section headingText="Records">
                    <List records={records} />
                </Section>
            </main>
            <div aria-live="polite" aria-atomic="true">{liveText}</div>
        </div>
    );
}

export default Container;
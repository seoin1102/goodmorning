import { List } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import SaveMessageItem from '../components/chat/SaveMessageItem';
import SiteLayout from '../components/layout/SiteLayout';

function SaveMessage() {
    return (
        <SiteLayout>
            <Grid item xs={10}>
            <List style={{ height: '840px', overflow: 'auto' }}>

            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} date={"7월 20일"}/>
            <SaveMessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} date={"7월 20일"}/>
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} date={"7월 20일"}/>
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} date={"7월 20일"}/>
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} date={"7월 20일"}/>
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"left"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />
            <SaveMessageItem align={"right"} text={"Cool. i am good, let's catch up!"} time={"09:31"} />

        </List>
        </Grid>
        </SiteLayout>
    );
}

export default SaveMessage;
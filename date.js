   ////Sets Days for App
        // const currDate = new Date();
        // console.log(currDate)
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDay = data.list[i].dt;
        const makeDate = new Date();
        const correctDate = 24 - makeDate.getUTCDate()
        console.log( correctDate);


        ////use different days arrays for different correct dates aka shfit stuff over based on correct date
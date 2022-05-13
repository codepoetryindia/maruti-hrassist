

  const Calander = () => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    return (
      <View>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            width: '100%',
            marginTop: 10,
            backgroundColor: '#a9bce7',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
            paddingVertical: 6
          }}>
          <Text style={{ color: 'gray', fontWeight: '800' }}>
            (Todays Menu ) -- {moment(date).format('MMM Do YYYY')}
          </Text>
          <View>
            <View>
              <TouchableOpacity onPress={() => (setOpen(true))}>
                <Ionicons name="calendar-outline" size={30} color={'#6ef7ff'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

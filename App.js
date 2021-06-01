
// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Switch,
} from 'react-native';

// For Step by Step Walkthrough
import {
  copilot,
  walkthroughable,
  CopilotStep,
} from 'react-native-copilot';

const App = (props) => {
  const [secondStepActive, setSecondStepActive] = useState(true);

  useEffect(() => {
    //setting a function to handle the step change event
    props.copilotEvents.on('stepChange', handleStepChange);
    //To start the step by step Walk through
    props.start();
  }, []);

  const handleStepChange = (step) => {
    //Handler, in case we want to handle the step change
    console.log(`Current step is: ${step.name}`);
  };

  //Making a WalkthroughableText
  const WalkthroughableText = walkthroughable(Text);
  //Making a WalkthroughableImage
  const WalkthroughableImage = walkthroughable(Image);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/*Step 1 to show the heading*/}
        <CopilotStep
          text="This is the heading with some style"
          order={1}
          name="firstUniqueKey">
          <WalkthroughableText style={styles.title}>
            App introduction - Let us help you get started.
          </WalkthroughableText>
        </CopilotStep>
        {/*Step 3 to show the Image*/}
        <CopilotStep 
          text="This is a image"
          order={3}
          name="thirdUniqueKey">
          <WalkthroughableImage
            source={require('./aline/aline-logo-rounded.png')}
            style={styles.profilePhoto}
          />
        </CopilotStep>
        {/*Step 2 to show the normal text*/}
        <View style={styles.activeSwitchContainer}>
          <CopilotStep
            active={secondStepActive}
            text="This is simple text without style"
            order={2}
            name="SecondUniqueKey">
            <WalkthroughableText>
              Set online status and visiblilty
            </WalkthroughableText>
          </CopilotStep>
          <View style={{flexGrow: 1}} />
          <Switch
            onValueChange={(secondStepActive) =>
              setSecondStepActive(secondStepActive)
            }
            value={secondStepActive}
          />
        </View>
        {/*Button to start the walkthrough*/}
        <View style={styles.middleView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.start()}>
            <Text style={styles.buttonText}>
              START APP INTRODUCTION TOUR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default copilot({
  animated: true, // Can be true or false
  overlay: 'svg', // Can be either view or svg
})(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 70,
    marginVertical: 60,
  },
  middleView: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0abab5',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  activeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});
import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";

function Ratings({ onSubmit }) {
  const [score, setScore] = useState("10");
  const [comment, setComment] = useState("");

  const isDisabled = Number(score) < 5 && comment.length <= 10;

  const textAreaPlaceholder = isDisabled
    ? "Please provide a comment explaining why the experience was not good. Minimum length is 10 characters."
    : "Optional feedback";

  const handleSubmit = () => {
    onSubmit({ score, comment });
  };

  return (
    <ScrollView>
      <View>
        <Text>Feedback form</Text>
        <View>
        <Text>Score: {score} ⭐</Text>
        <Slider
          value={score}
          onValueChange={handleScoreChange}
          minimumValue={0}
          maximumValue={10}
          step={1} // You can adjust the step value to control granularity
        />
      </View>
        <View>
          <Text>Comments:</Text>
          <TextInput
            placeholder={textAreaPlaceholder}
            value={comment}
            onChangeText={(value) => setComment(value)}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <Button title="Submit" onPress={handleSubmit} disabled={isDisabled} />
      </View>
    </ScrollView>
  );
}

export default Ratings;

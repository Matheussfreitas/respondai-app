import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface QuizCardProps {
  title: string;
  description: string;
  level: string;
  questionsCount: number;
  imageUrl: ImageSourcePropType;
}

export default function QuizCard({
  title,
  description,
  level,
  questionsCount,
  imageUrl,
}: QuizCardProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        maxWidth: 180,
        width: '100%',
        maxHeight: 300,
        height: '100%',
      }}
    >
      <Image
        source={imageUrl}
        style={{ width: '100%', height: 100, borderRadius: 10 }}
      />

      <View
        style={{
          flex: 1,
          width: '100%',
          marginTop: 10,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          <Text style={{ marginTop: 5 }}>{description}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>{level}</Text>
          <Text>{questionsCount}</Text>
        </View>
      </View>
    </View>
  );
}
